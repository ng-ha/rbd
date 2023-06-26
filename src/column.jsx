import React from "react";
import styled from "styled-components";
import Task from "./task";
import Droppable from "./StrictModeDroppable";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${(props) =>
        props.$isDraggingOver ? "skyblue" : "white"};

    display: flex;
`;

export default class Column extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable
                    droppableId={this.props.column.id}
                    type={this.props.column.id === "column-3" ? "done" : "active"}
                    isDropDisabled={this.props.isDropDisabled}
                    direction='horizontal'
                >
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            $isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}

// const droppableSnapshot = {
//     isDraggingOver: false,  <---------
//     draggingOverWith: null, <---------
//     draggingFromThisWith: null,
//     isUsingPlaceholder: false,
// };
