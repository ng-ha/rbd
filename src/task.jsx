import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 3px solid lightgrey;
    border-radius: 50%;
    padding: 8px;
    margin-right: 8px;
    background-color: ${(props) =>
        props.$isDraggingDisabled
            ? "lightgray"
            : props.$isDragging
            ? "lightgreen"
            : "white"};
    display: flex;
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
        outline: none;
        border-color: red;
    }
`;

export default class Task extends React.Component {
    render() {
        const isDragDisabled = this.props.task.id === "task-1";
        return (
            <Draggable
                draggableId={this.props.task.id}
                index={this.props.index}
                isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        $isDragging={snapshot.isDragging}
                        $isDraggingDisabled={isDragDisabled}
                        {...provided.dragHandleProps} 
                    >
                        {this.props.task.content[0]}
                    </Container>
                )}
            </Draggable>
        );
    }
}

// const draggableSnapshot = {
//     isDragging: false, <--------
//     isDropAnimating: false,
//     isClone: false,
//     dropAnimation: null,
//     mode: null,
//     draggingOver: null, <--------
//     combineTargetFor: null,
//     combineWith: null,
// };
