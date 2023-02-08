import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    height: 100vh;
    padding-top: 100px;
    .react-transform-wrapper {
        border: 2px solid white;
        padding: 10px;
        max-height: 760px;
        max-width: 1400px;
    }
`
export const Wrapper = styled.div`
    width: 100%;
    // max-width: 1400px;
    // max-height: 80vh;
    display: flex;
    justify-content: center;
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

