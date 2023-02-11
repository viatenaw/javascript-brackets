import { useEffect, useState } from 'react'

import { StageTile } from "../../modules/home/style"
import { MatchCard } from "./components/MatchCard"
import { Container, Row, MatchPairCard, BorderBoxWrapper, Column, BorderBox, BorderBoxTop, BorderBoxWrapperLeft } from "./style"
import { gapMapping, sortArrayOfObjects } from '../utils';
import { data } from './data';
import { SEMI_FINAL_1, SEMI_FINAL_2 } from '../text';

const PARTION_LIMIT = 8
export const Brackets = () => {
    const [headCol1, setHeadCol1] = useState([])
    const [headCol2, setHeadCol2] = useState<string[]>([])
    const [bodyCol1, setBodyCol1] = useState([])
    const [bodyCol2, setBodyCol2] = useState([])
    const [lastRoundNum, setLastRoundNum] = useState(1)
    const [highlightedUserId, setHighlightedUserId] = useState('')
    const [highlightedRoundNum, setHighlightedRoundNum] = useState<number>()

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const headArray: any = []
        const bodyArray: any = []
        let modifiedData: any = []
        let numOfRounds = 1
        data.forEach((el: any, index) => {
            const matchNum = el?.name?.split(" - ")?.[1]?.split(" ")?.[1]
            modifiedData.push({ ...el, matchText: matchNum })
            let roundNum = Number(el.tournamentRoundText)
            if (roundNum > numOfRounds) numOfRounds = roundNum
        })
        const sortedData: any = sortArrayOfObjects(modifiedData, 'matchText')


        sortedData.forEach((el: any, index: number) => {
            let roundName = el?.name || ''
            let roundNum = Number(el.tournamentRoundText)
            const nextMatchId = el.nextMatchId
            const isFinal = roundNum === numOfRounds
            const isSemiFinal = roundNum === numOfRounds - 1

            const roundData: any = bodyArray[roundNum - 1] || {}
            bodyArray[roundNum - 1] = roundData

            if (isFinal) {
                bodyArray[roundNum - 1].final = [el]
                roundName = roundName.split(" - ")[0].trim() || 'Final'
            } else if (isSemiFinal && sortedData.length >= PARTION_LIMIT) {
                if (bodyArray[roundNum - 1].hasOwnProperty(SEMI_FINAL_1)) {
                    bodyArray[roundNum - 1][SEMI_FINAL_2] = [el]
                } else {
                    bodyArray[roundNum - 1][SEMI_FINAL_1] = [el]
                }
            } else if (nextMatchId) {
                const pairData: any = bodyArray?.[roundNum - 1]?.[nextMatchId] || []
                bodyArray[roundNum - 1][nextMatchId] = [...pairData, el]
                roundName = roundName.split(" - ")[0].trim() || `Round ${roundNum - 1}`
            }
            if (!headArray.includes(roundName)) headArray[roundNum - 1] = roundName
        })
        let data1: any = [], data2: any = [];

        if (sortedData.length > PARTION_LIMIT) {
            bodyArray.forEach((round: any, idx: number) => {
                const roundLen = Object.keys(round).length

                Object.entries(round).map(([k, v], rIdx) => {
                    if (rIdx < roundLen / 2) {
                        if (!data1?.[idx]) data1[idx] = {}
                        data1[idx][k] = v
                    } else {
                        if (!data2?.[idx]) data2[idx] = {}
                        data2[idx][k] = v
                    }
                })
            })
            const limit = numOfRounds - 1
            let headCol: string[] = Array.from({ length: limit }, (_, index) => limit - index).map(el => `Round ${el}`)
            headCol[0] = 'Semi final'
            setHeadCol2(headCol)
        } else {
            data1 = bodyArray
        }

        setHeadCol1(headArray)
        setBodyCol1(data1)
        setBodyCol2(data2?.reverse() || [])
        setLastRoundNum(numOfRounds)
    }


    return <Container>
        <Row>
            {
                headCol1.map((name: string, idx) => <StageTile key={idx}>{name}</StageTile>)
            }
            {
                headCol2.map((name: string, idx) => <StageTile key={idx}>{name}</StageTile>)
            }
        </Row>
        <Row>
            {
                bodyCol1.map((round, roundIndex) => {
                    return (
                        <RoundColumn setHighlightedUserId={setHighlightedUserId}
                            setHighlightedRoundNum={setHighlightedRoundNum}
                            highlightedUserId={highlightedUserId}
                            highlightedRoundNum={highlightedRoundNum}
                            round={round}
                            roundIndex={roundIndex}
                            key={roundIndex}
                            lastRoundNum={lastRoundNum}
                            isPartioned={data.length >= PARTION_LIMIT}
                        />
                    )
                })
            }
            {bodyCol2 &&
                bodyCol2.map((round, roundIndex) => {
                    return (
                        <RoundColumn setHighlightedUserId={setHighlightedUserId}
                            setHighlightedRoundNum={setHighlightedRoundNum}
                            highlightedUserId={highlightedUserId}
                            highlightedRoundNum={highlightedRoundNum}
                            round={round}
                            roundIndex={roundIndex}
                            key={roundIndex}
                            lastRoundNum={lastRoundNum}
                            isPartioned={data.length >= PARTION_LIMIT}
                            isCol2
                        />
                    )
                })
            }
        </Row>
    </Container>
}


interface I_RoundColumnProps {
    round: any
    roundIndex: number
    lastRoundNum: number
    setHighlightedUserId: any
    highlightedUserId: string
    highlightedRoundNum: any
    setHighlightedRoundNum: any
    isCol2?: boolean
    isPartioned?: boolean

}
const RoundColumn = (props: I_RoundColumnProps) => {
    const { isCol2, isPartioned, round, roundIndex, lastRoundNum, setHighlightedUserId, highlightedUserId, setHighlightedRoundNum, highlightedRoundNum } = props

    const highlightBox = (matches: any, isbox: boolean = false) => {
        if (!matches?.participants || !highlightedUserId) return false
        const resp = matches?.participants?.some((el: any) => el.id === highlightedUserId && (el.isWinner || !isbox))
        return resp
    }
    const gapMapping2: any = gapMapping.slice(0, lastRoundNum - 1).reverse()

    return (
        <Column gap='36px'>
            {
                Object.entries(round).map(
                    ([pairId, matches]: any, idx) => {
                        return (
                            <MatchPairCard key={idx} gap={isCol2 ? gapMapping2[roundIndex] : gapMapping[roundIndex]}>
                                {
                                    matches.map((match: any, matchIdx: number) => {
                                        return <MatchCard
                                            setHighlightedUserId={setHighlightedUserId}
                                            setHighlightedRoundNum={setHighlightedRoundNum}
                                            match={match}
                                            matchIdx={matchIdx}
                                            key={match.id || `${roundIndex}-${pairId}-${matchIdx}`}
                                            roundIndex={roundIndex}
                                            pairId={pairId}
                                            highlightedRoundNum={highlightedRoundNum}
                                            highlightedUserId={highlightedUserId}
                                            isLineActive={highlightBox(matches[matchIdx])}
                                            isCol2={isCol2}
                                            isPartioned={isPartioned}
                                        />
                                    })
                                }
                                {isCol2
                                    ? (roundIndex > 0 && roundIndex + 1 < lastRoundNum) && <BorderBoxWrapperLeft>
                                        <BorderBoxTop className={highlightBox(matches[0], true) ? 'hover top topLeft' : 'topLeft'} isActive={highlightBox(matches[0], true)} />
                                        <BorderBox className={highlightBox(matches[1], true) ? 'hover bottom bottomLeft' : 'bottomLeft'} isActive={highlightBox(matches[1] || {}, true)} />
                                    </BorderBoxWrapperLeft>
                                    : roundIndex + (isPartioned ? 2 : 1) < lastRoundNum && <BorderBoxWrapper>
                                        <BorderBoxTop className={highlightBox(matches[0], true) ? 'hover top topRight' : 'topRight'} isActive={highlightBox(matches[0], true)} />
                                        <BorderBox className={highlightBox(matches[1], true) ? 'hover bottom bottomRight' : 'bottomRight'} isActive={highlightBox(matches[1] || {}, true)} />
                                    </BorderBoxWrapper>
                                }
                            </MatchPairCard>
                        )
                    }
                )
            }
        </Column>
    )
}
