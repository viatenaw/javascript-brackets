import { Line2, ResultsTile, Tile } from "../style"
import { FINAL, SCORE_DONE, SEMI_FINAL_1, SEMI_FINAL_2 } from "../../text";
import { Line, MatchCardWrapper, RoundNameWrapper, StartTimeWrapper, SmallTile } from "../style"
import { limitStringLength } from "../../utils";
import { useState } from 'react';

interface I_MatchCardProps {
    match?: any
    matchIdx?: number
    roundIndex?: number
    setHighlightedUserId: any
    setHighlightedRoundNum: any
    highlightedRoundNum: any
    highlightedUserId: string
    isLineActive: boolean
    isCol2?: boolean
    pairId: string
    isPartitioned?: boolean
}

const playoffs = [SEMI_FINAL_1, SEMI_FINAL_2, FINAL]
export const MatchCard = (props: I_MatchCardProps) => {
    const { isCol2 = false, isPartitioned = false, match, pairId, roundIndex = 0, setHighlightedUserId, setHighlightedRoundNum, highlightedUserId, isLineActive } = props
    const { participants = [], startTime = 'TBD', name, state, tournamentRoundText } = match

    const [isHighlightedWinner, setIsHighlightedWinner] = useState(false)

    const handleFocus = (user: any) => {
        setHighlightedUserId(user?.id)
        setIsHighlightedWinner(user?.isWinner)
        setHighlightedRoundNum(roundIndex)
    }
    const reset = () => {
        setHighlightedUserId('')
        setHighlightedRoundNum(0)
        setIsHighlightedWinner(false)
    }
    const getClassName = () => {
        if (!isLineActive) return false

        return (
            ((participants[0]?.isWinner && participants[0]?.id === highlightedUserId)) ||
            ((participants[1]?.isWinner && participants[1]?.id === highlightedUserId)) ||
            (isCol2 && pairId !== SEMI_FINAL_2) ||
            (!isCol2 && pairId !== FINAL) ||
            (!isPartitioned && isLineActive) ||
            isHighlightedWinner
        )
    }
    return (
        <MatchCardWrapper>
            <StartTimeWrapper>
                {startTime}
            </StartTimeWrapper>
            {
                participants.length > 1
                    ?
                    <>
                        {
                            state === SCORE_DONE ?
                                <>
                                    <ResultsTile
                                        onMouseOver={() => handleFocus(participants[0])}
                                        onMouseLeave={() => reset()}
                                        isHighlighted={participants[0].id === highlightedUserId}
                                        isWinner={participants[0].isWinner}
                                        className={participants[0].id === highlightedUserId ? 'highlighted tile' : 'tile'}
                                    >
                                        {limitStringLength(participants[0].name)}
                                        {<SmallTile isWinner={participants[0].isWinner}>{participants[0].isWinner ? 'Won' : 'Lost'}</SmallTile>}
                                    </ResultsTile>
                                    <ResultsTile
                                        onMouseOver={() => handleFocus(participants[1])}
                                        onMouseLeave={() => reset()}
                                        isHighlighted={participants[1].id === highlightedUserId}
                                        isWinner={participants[1].isWinner}
                                        className={participants[1].id === highlightedUserId ? 'highlighted tile' : 'tile'}
                                    >
                                        {limitStringLength(participants[1].name)}

                                        {<SmallTile isWinner={participants[1].isWinner} >{participants[1].isWinner ? 'Won' : 'Lost'}</SmallTile>}
                                    </ResultsTile></>
                                : <>
                                    <Tile
                                        onMouseOver={() => handleFocus(participants[0])}
                                        onMouseLeave={() => reset()}
                                        isHighlighted={participants[0].id === highlightedUserId}
                                        isWinner={participants[0].isWinner}
                                        className={participants[0].id === highlightedUserId ? 'highlighted tile' : 'tile'}
                                    >
                                        {participants[0].name}
                                    </Tile>
                                    <Tile
                                        onMouseOver={() => handleFocus(participants[1])}
                                        onMouseLeave={() => reset()}
                                        isHighlighted={participants[1].id === highlightedUserId}
                                        isWinner={participants[1].isWinner}
                                        className={participants[1].id === highlightedUserId ? 'highlighted tile' : 'tile'}
                                    >
                                        {participants[1].name}
                                    </Tile>
                                </>
                        }

                    </>

                    : participants.length === 1
                        ? (
                            <>
                                <Tile
                                    onMouseOver={() => handleFocus(participants[0])}
                                    onMouseLeave={() => reset()}
                                    isHighlighted={participants[0].id === highlightedUserId}
                                    className={participants[0].id === highlightedUserId ? 'highlighted tile' : 'tile'}
                                >
                                    {participants[0].name}
                                </Tile>
                                <Tile>TBD</Tile>
                            </>
                        )
                        : <>
                            <Tile>TBD</Tile>
                            <Tile>TBD</Tile>
                        </>
            }
            <RoundNameWrapper>
                {name || 'Round'}
            </RoundNameWrapper>
            {
                ((!isCol2 && roundIndex > 0) || (isCol2 && (tournamentRoundText !== '1'))) &&
                <Line
                    isCol2={isCol2 && pairId !== SEMI_FINAL_2}
                    className={getClassName() ? 'hover' : ''}
                    isActive={getClassName()}
                />
            }
            {
                (playoffs.includes(pairId) && isPartitioned) &&
                <Line2
                    className={(pairId !== SEMI_FINAL_1 || isHighlightedWinner) && isLineActive ? 'hover' : ''}
                    isActive={(pairId !== SEMI_FINAL_1 || isHighlightedWinner) && isLineActive}
                />
            }

        </MatchCardWrapper>
    )
}