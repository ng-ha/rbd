import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { styled } from "styled-components";
import Column from "./column";
import initialData from "./initial-data";
import Droppable from "./StrictModeDroppable";

const Container = styled.div`
    display: flex;
`;
class InnerList extends React.PureComponent {
    // shouldComponentUpdate(nextProps) {
    //     if (
    //         nextProps.column === this.props.column &&
    //         nextProps.taskMap === this.props.taskMap &&
    //         nextProps.index === this.props.index &&
    //         nextProps.isDropDisabled === this.props.isDropDisabled
    //     ) {
    //         return false;
    //     }
    //     return true;
    // }
    render() {
        const { column, taskMap, index, isDropDisabled } = this.props;
        const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
        return (
            <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
                index={index}
            />
        );
    }
}
export default class App extends React.Component {
    state = initialData;

    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragUpdate = this.onDragUpdate.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragStart(start) {
        document.body.style.color = "orange";
        document.body.style.transition = "background-color 0.2s ease";

        const homeIndex = this.state.columnOrder.indexOf(
            start.source.droppableId
        );
        this.setState({ homeIndex });
    }
    onDragUpdate(update) {
        const { destination } = update;
        const opacity = destination
            ? destination.index / Object.keys(this.state.tasks).length
            : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    }
    onDragEnd(result) {
        document.body.style.color = "inherit";
        document.body.style.backgroundColor = "inherit";

        this.setState({ homeIndex: null });

        const { destination, source, draggableId, type } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === "column") {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            this.setState({
                ...this.state,
                columnOrder: newColumnOrder,
            });
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
            this.setState({
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            });
            return;
        }
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        this.setState({
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        });
    }

    render() {
        return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd}
            >
                <Droppable
                    droppableId="all-column"
                    direction="horizontal"
                    type="column"
                >
                    {(provided) => (
                        <Container
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.state.columnOrder.map((columnId, index) => {
                                const column = this.state.columns[columnId];
                                const isDropDisabled =
                                    index < this.state.homeIndex;

                                return (
                                    <InnerList
                                        key={column.id}
                                        column={column}
                                        taskMap={this.state.tasks}
                                        isDropDisabled={isDropDisabled}
                                        index={index}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

// const start = {
//     draggableId: "task-4",
//     source: { droppableId: "column-1", index: 3 },
//     type: "DEFAULT",
//     mode: "FLUID",
// };
// const update = {
//     draggableId: "task-4",
//     source: { droppableId: "column-1", index: 3 },
//     destination: { droppableId: "column-1", index: 2 },
//     combine: null,
//     mode: "FLUID",
//     type: "DEFAULT",
// };
// const result = {
//     draggableId: "task-4",
//     source: { droppableId: "column-1", index: 3 },
//     destination: { droppableId: "column-1", index: 2 },   // or null
//     reason: "DROP",                                       // or 'CANCEL'
//     type: "DEFAULT",
//     mode: "FLUID",
//     combine: null,
// };
