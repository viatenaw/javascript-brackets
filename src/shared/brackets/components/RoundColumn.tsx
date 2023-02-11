import { gapMapping } from "../../utils"
import { BorderBox, BorderBoxTop, BorderBoxWrapper, BorderBoxWrapperLeft, Column, MatchPairCard } from "../style"
import { MatchCard } from "./MatchCard"

interface I_RoundColumnProps {
    round: any
    roundIndex: number
    lastRoundNum: number
    setHighlightedUserId: any
    highlightedUserId: string
    highlightedRoundNum: any
    setHighlightedRoundNum: any
    isCol2?: boolean
    isPartitioned?: boolean

}
export const RoundColumn = (props: I_RoundColumnProps) => {
    const { isCol2, isPartitioned, round, roundIndex, lastRoundNum, setHighlightedUserId, highlightedUserId, setHighlightedRoundNum, highlightedRoundNum } = props

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
                                            isPartitioned={isPartitioned}
                                        />
                                    })
                                }
                                {isCol2
                                    ? (roundIndex > 0 && roundIndex + 1 < lastRoundNum) && <BorderBoxWrapperLeft>
                                        <BorderBoxTop className={highlightBox(matches[0], true) ? 'hover top topLeft' : 'topLeft'} isActive={highlightBox(matches[0], true)} />
                                        <BorderBox className={highlightBox(matches[1], true) ? 'hover bottom bottomLeft' : 'bottomLeft'} isActive={highlightBox(matches[1] || {}, true)} />
                                    </BorderBoxWrapperLeft>
                                    : roundIndex + (isPartitioned ? 2 : 1) < lastRoundNum && <BorderBoxWrapper>
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