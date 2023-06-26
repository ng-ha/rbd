import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${(props) =>
        props.$isDraggingDisabled
            ? "lightgray"
            : props.$isDragging
            ? "lightgreen"
            : "white"};
    display: flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
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
                    >
                        <Handle {...provided.dragHandleProps} />
                        {this.props.task.content}
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
