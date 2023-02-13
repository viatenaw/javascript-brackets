import { useEffect, useState } from 'react'

import { StageTile } from "./style"
import { Container, Row, } from "./style"
import { sortArrayOfObjects } from '../utils';
import { data } from './data';
import { SEMI_FINAL_1, SEMI_FINAL_2 } from '../text';
import { RoundColumn } from './components/RoundColumn';

const PARTITION_LIMIT = 8
export const Brackets = () => {
    const [headCol1, setHeadCol1] = useState([])
    const [headCol2, setHeadCol2] = useState<string[]>([])
    const [bodyCol1, setBodyCol1] = useState([])
    const [bodyCol2, setBodyCol2] = useState([])
    const [lastRoundNum, setLastRoundNum] = useState(1)
    const [highlightedUserId, setHighlightedUserId] = useState('')
    const [highlightedRoundNum, setHighlightedRoundNum] = useState<number>()
    const [isPartitioned, setIsPartitioned] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const headArray: any = []
        const bodyArray: any = []
        let modifiedData: any = []
        let numOfRounds = 1
        const bracketData = data
        bracketData.forEach((el: any, index) => {
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
            } else if (isSemiFinal && sortedData.length >= PARTITION_LIMIT) {
                if (bodyArray[roundNum - 1].hasOwnProperty(SEMI_FINAL_1)) {
                    bodyArray[roundNum - 1][SEMI_FINAL_2] = [el]
                } else {
                    bodyArray[roundNum - 1][SEMI_FINAL_1] = [el]
                }
                roundName = 'Semi Final - 1'
            } else if (nextMatchId) {
                const pairData: any = bodyArray?.[roundNum - 1]?.[nextMatchId] || []
                bodyArray[roundNum - 1][nextMatchId] = [...pairData, el]
                roundName = roundName.split(" - ")[0].trim() || `Round ${roundNum - 1}`
            }
            if (!headArray.includes(roundName)) headArray[roundNum - 1] = roundName
        })
        let data1: any = [], data2: any = [];

        if (sortedData.length > PARTITION_LIMIT) {
            setIsPartitioned(true)
            bodyArray.forEach((round: any, idx: number) => {
                const roundLen = Object.keys(round).length

                Object.entries(round).forEach(([k, v], rIdx) => {
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
            headCol[0] = 'Semi Final - 2'
            setHeadCol2(headCol)
        } else {
            setIsPartitioned(false)
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
                            isPartitioned={isPartitioned}
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
                            isPartitioned={isPartitioned}
                            isCol2
                        />
                    )
                })
            }
        </Row>
    </Container>
}