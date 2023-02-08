import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Container, Wrapper } from "./style"
import { Brackets } from "../../shared/brackets"

export const Home = () => {
    return <Container>
        <Wrapper>
            <TransformWrapper initialScale={1} minScale={.2} maxScale={1.1} disablePadding centerZoomedOut>
                <TransformComponent>
                    <Brackets />
                </TransformComponent>
            </TransformWrapper>
        </Wrapper>
    </Container>
}

