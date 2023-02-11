import styled from "styled-components";

export const Container = styled.div`
    // height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding-bottom: 100px;
    padding-right: 100px;
`
export const Row = styled.div`
    display: flex;
    gap: 100px;

`
interface I_ColumnProps {
    gap?: string
}
export const Column = styled.div<I_ColumnProps>`
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    gap: ${props => props.gap};

`
interface I_MatchPairCard {
    gap?: string
}
export const MatchPairCard = styled.div<I_MatchPairCard>`
    display: flex;
    flex-flow: column;
    gap: ${props => props.gap || '48px'};
    position: relative;
`
export const MatchCardWrapper = styled.div`
    display: flex;
    flex-flow: column;
    gap: 4px; 
    position: relative;
    color: #fff;

    .hover{
        animation: 1s linear .2s  box;
    }
    @keyframes box{
        0%  { 
            width: 0px; background-color: #FF0;   
        }
         
        50% { 
            width: 30%; background-color: #fff;
        }
    }

    .tile:before {
        content: "";
        position: absolute;
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        top: calc(2px/-1);
        left: calc(2px/-1);
        background: linear-gradient(to right, #fff 0%, #fff 100%), linear-gradient(to top, #fff 50%, transparent 50%), linear-gradient(to top, #fff 50%, transparent 50%), linear-gradient(to right, #fff 0%, #fff 100%), linear-gradient(to left, #fff 0%, #fff 100%);
        background-size: 100% 2px, 2px 200%, 2px 200%, 0% 2px, 0% 2px;
        background-position: 50% 100%, 0% 0%, 100% 0%, 100% 0%, 0% 0%;
        background-repeat: no-repeat, no-repeat;
        transition: transform 0.3s ease-in-out, background-position 0.3s ease-in-out, background-size 0.3s ease-in-out;
        transform: scaleX(0) rotate(0deg);
        transition-delay: 0.6s, 0.3s, 0s;
        border-radius: 4px;
      }
      .highlighted:before {
        background-size: 200% 2px, 2px 400%, 2px 400%, 55% 2px, 55% 2px;
        background-position: 50% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%;
        transform: scaleX(1) rotate(0deg);
        transition-delay: 0s, 0.3s, 0.6s;
        border-radius: 4px;
      }
`
interface I_SmallTileProps {
    isWinner?: boolean
}
export const SmallTile = styled.div<I_SmallTileProps>`
    min-width: 38px;
    height: 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 6px;
    gap: 8px;
    background: ${props => props.isWinner ? 'rgba(214, 235, 247, 0.2)' : 'inherit'};
    border-radius: 4px;
`

interface I_BorderBoxProps {
    isActive?: boolean
    isCol2?: boolean

}
export const BorderBoxTop = styled.div<I_BorderBoxProps>`
    height: 50%;
    border: ${props => props.isActive ? '2px solid #fff' : '1px solid rgba(255, 255, 255, 0.2)'};
`
export const BorderBox = styled.div<I_BorderBoxProps>`
    height: 50%;
    border: ${props => props.isActive ? '2px solid #fff' : '1px solid rgba(255, 255, 255, 0.2)'};
`

export const BorderBoxWrapper = styled.div`
    position: absolute;
    transform: translateY(-50%);
    height: calc(100% - 115px);
    width: 28%;
    top: 50%;
    left:  100%;
    z-index: -1;
    .hover {
        // border: 8px solid;
        border: 2px solid #fff;
        // border-image: repeating-linear-gradient(135deg,#F8CA00 0 10px,#E97F02 0 20px,#BD1550 0 30px) 8;
        -webkit-mask: 
          conic-gradient(from 180deg at top 8px right 8px, #0000 90deg,#000 0)
           var(--_i,200%) 0  /200% var(--_i,8px) border-box no-repeat,
          conic-gradient(at bottom 8px left  8px,  #0000 90deg,#000 0)
           0   var(--_i,200%)/var(--_i,8px) 200% border-box no-repeat,
          linear-gradient(#000 0 0) padding-box no-repeat;
        transition: .5s, -webkit-mask-position 1s 1s;
        --_i: 100%;
        color: #CC333F;
        transition: .5s, -webkit-mask-size 2s 2s;
        border-left: none;
      }
      .top {
        border-bottom: none;
      }
      .bottom {
        border-top: none;
      }
    }
    .topRight{
        border-left: none;
        border-bottom: none;
    }
    .bottomRight{
        border-left: none;
        border-top: none;
    }
`
export const BorderBoxWrapperLeft = styled(BorderBoxWrapper)`
    left: -30%;
    .hover {
        // border: 8px solid;
        border: 2px solid #fff;
        // border-image: repeating-linear-gradient(135deg,#F8CA00 0 10px,#E97F02 0 20px,#BD1550 0 30px) 8;
        -webkit-mask: 
          conic-gradient(from 180deg at top 8px right 8px, #0000 90deg,#000 0)
           var(--_i,200%) 0  /200% var(--_i,8px) border-box no-repeat,
          conic-gradient(at bottom 8px left  8px,  #0000 90deg,#000 0)
           0   var(--_i,200%)/var(--_i,8px) 200% border-box no-repeat,
          linear-gradient(#000 0 0) padding-box no-repeat;
        transition: .5s, -webkit-mask-position 1s 1s;
        --_i: 100%;
        color: #CC333F;
        transition: .5s, -webkit-mask-size 2s 2s;
        border-right: none;
      }
      .top {
        border-bottom: none;
      }
      .bottom {
        border-top: none;
      }
    }
    .topLeft{
        border-right: none;
        border-bottom: none;
    }
    .bottomLeft{
        border-right: none;
        border-top: none;
    }
`
export const Line = styled.div<I_BorderBoxProps>`
    position: absolute;
    width: 30%;
    top: 50%;
    left: ${props => props.isCol2 ? '100%' : '-30%'};
    transform: translateY(-50%);
    background: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
    height: ${props => props.isActive ? '2px' : '1px'}
`
export const Line2 = styled.div<I_BorderBoxProps>`
    position: absolute;
    width: 30%;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    background: ${props => props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
    height: ${props => props.isActive ? '2px' : '1px'}
`

export const StartTimeWrapper = styled.div`
    font-family: 'Graphik';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
`

export const RoundNameWrapper = styled.div`
    font-family: 'Graphik';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    text-align: center;
`

interface I_TileProps {
    isHighlighted?: boolean
    isWinner?: boolean
}
export const Tile = styled.div<I_TileProps>`
    width: 170px;
    height: 40px;
    border-radius: 4px;
    outline: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.isWinner ? 'linear-gradient(92.78deg, #1FC3CE 0%, #6E3097 99.51%)' : 'inherit'};
    color: #fff;
    position: relative;
`
export const ResultsTile = styled(Tile) <I_TileProps>`
    justify-content: space-between;
    padding: 8px;
`

export const StageTile = styled.div`
    width: 170px;
    height: 40px;
    border-radius: 6px;
    background: rgba(154, 106, 254, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-family: 'GraphikRegular';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
`