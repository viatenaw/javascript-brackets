import { useEffect, useState } from 'react'

import { StageTile } from "../../modules/home/style"
import { MatchCard } from "./components/MatchCard"
import { Container, Row, MatchPairCard, BorderBoxWrapper, Column, BorderBox, BorderBoxTop } from "./style"
import { gapMapping } from '../utils';
import { data } from './data';

export const Brackets = () => {
    const [headRow, setHeadRow] = useState([])
    const [bodyRow, setBodyRow] = useState([])
    const [lastRoundNum, setLastRoundNum] = useState(1)
    const [highlightedUserId, setHighlightedUserId] = useState('')
    const [highlightedRoundNum, setHighlightedRoundNum] = useState<number>()

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const headArray: any = []
        const bodyArray: any = []

        let numOfRounds = 1
        data.forEach((el: any, index) => {
            let roundName = el?.name || ''
            let roundNum = Number(el.tournamentRoundText)
            if (roundNum > numOfRounds) numOfRounds = roundNum
            const nextMatchId = el.nextMatchId
            const isFinal = roundNum === numOfRounds

            const roundData: any = bodyArray[roundNum - 1] || {}
            bodyArray[roundNum - 1] = roundData

            if (nextMatchId) {
                const pairData: any = bodyArray?.[roundNum - 1]?.[nextMatchId] || []
                bodyArray[roundNum - 1][nextMatchId] = [...pairData, el]
                roundName = roundName.split(" - ")[0].trim() || `Round ${roundNum - 1}`

            } else if (isFinal) {
                bodyArray[roundNum - 1].final = [el]
                roundName = roundName.split(" - ")[0].trim() || 'Final'
            }
            if (!headArray.includes(roundName)) headArray[roundNum - 1] = roundName
        })
        console.log('headArray', headArray);
        
        setHeadRow(headArray)
        setBodyRow(bodyArray)
        setLastRoundNum(numOfRounds)
    }

    return <Container>
        <Row>
            {
                headRow.map((name: string, idx) => <StageTile key={idx}>{name}</StageTile>)
            }
        </Row>
        <Row>
            {
                bodyRow.map((round, roundIndex) => {
                    return (
                        <RoundColumn setHighlightedUserId={setHighlightedUserId}
                            setHighlightedRoundNum={setHighlightedRoundNum}
                            highlightedUserId={highlightedUserId}
                            highlightedRoundNum={highlightedRoundNum}
                            round={round}
                            roundIndex={roundIndex}
                            key={roundIndex}
                            lastRoundNum={lastRoundNum} 
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
}
const RoundColumn = (props: I_RoundColumnProps) => {
    const { round, roundIndex, lastRoundNum, setHighlightedUserId, highlightedUserId, setHighlightedRoundNum, highlightedRoundNum } = props

    const highlightBox = (matches: any, isbox: boolean = false) => {
        if (!matches?.participants || !highlightedUserId) return false
        const resp = matches?.participants?.some((el: any) => el.id === highlightedUserId && (el.isWinner || !isbox))
        return resp
    }
    return (
        <Column gap='36px'>
            {
                Object.entries(round).map(
                    ([nextMatchId, matches]: any, idx) => {
                        return (
                            <MatchPairCard key={idx} gap={gapMapping[roundIndex]}>
                                {
                                    matches.map((match: any, matchIdx: number) => {
                                        return <MatchCard
                                            setHighlightedUserId={setHighlightedUserId}
                                            setHighlightedRoundNum={setHighlightedRoundNum}
                                            match={match}
                                            matchIdx={matchIdx}
                                            key={match.id || `${roundIndex}-${nextMatchId}-${matchIdx}`}
                                            roundIndex={roundIndex}
                                            highlightedRoundNum={highlightedRoundNum}
                                            highlightedUserId={highlightedUserId}
                                            isLineActive={highlightBox(matches[matchIdx])}
                                        />
                                    })
                                }
                                {
                                    roundIndex + 1 < lastRoundNum && <BorderBoxWrapper>
                                        <BorderBoxTop className={highlightBox(matches[0], true) ? 'hover top' : ''} isActive={highlightBox(matches[0], true)} />
                                        <BorderBox className={highlightBox(matches[1], true) ? 'hover bottom' : ''} isActive={highlightBox(matches[1] || {}, true)} />
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
