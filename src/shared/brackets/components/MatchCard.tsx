import { ResultsTile, Tile } from "../style"
import { SCORE_DONE } from "../../text";
import { Line, MatchCardWrapper, RoundNameWrapper, StartTimeWrapper, SmallTile } from "../style"
import { limitStringLength } from "../../utils";

interface I_MatchCardProps {
    match?: any
    matchIdx?: number
    roundIndex?: number
    setHighlightedUserId: any
    setHighlightedRoundNum: any
    highlightedRoundNum: any
    highlightedUserId: string
    isLineActive: boolean
}

export const MatchCard = (props: I_MatchCardProps) => {
    const { match, roundIndex = 0, setHighlightedUserId, setHighlightedRoundNum, highlightedUserId, isLineActive } = props
    const { participants = [], startTime = 'TBD', name, state } = match
   
    const handleFocus = (user: any) => {
        setHighlightedUserId(user.id)
        setHighlightedRoundNum(roundIndex)
    }
    const reset = () => {
        setHighlightedUserId('')
        setHighlightedRoundNum(0)
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
                roundIndex > 0 && <Line className={isLineActive ? 'hover' : ''} isActive={isLineActive} />
            }

        </MatchCardWrapper>
    )
}