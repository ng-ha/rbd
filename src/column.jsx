import React from "react";
import styled from "styled-components";
import Task from "./task";
import Droppable from "./StrictModeDroppable";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    background-color: white;

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
        props.$isDraggingOver ? "skyblue" : "inherit"};
    flex-grow: 1;
    min-height: 100px;
`;
class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false
        }
        return true
    }
    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.column.id}
                index={this.props.index}
            >
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>
                            {this.props.column.title}
                        </Title>
                        <Droppable
                            droppableId={this.props.column.id}
                            type="task"
                            isDropDisabled={this.props.isDropDisabled}
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    $isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );
    }
}

// const droppableSnapshot = {
//     isDraggingOver: false,  <---------
//     draggingOverWith: null, <---------
//     draggingFromThisWith: null,
//     isUsingPlaceholder: false,
// };
