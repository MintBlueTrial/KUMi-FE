import React from 'react';
import styles from '../../styles/index.less';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Col, Row } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import { KumiApi } from '@/models';

const api = new KumiApi();

const getItemStyle = (
  isDragging: any,
  draggableStyle: any,
  bgColor: string,
) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: 8 * 2,
  margin: `10px 10px 8px 10px`,
  boxShadow: '0 0 5px #666666',
  borderRadius: '5px',
  // change background colour if dragging
  background: isDragging ? bgColor : 'rgb(255 255 255 / 70%)',
  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class TaskBoard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      taskInfo: [],
      readyTaskIds: [],
      goingTaskIds: [],
      finishTaskIds: [],
      columnOrder: ['ready', 'going', 'finish'],
    };
    this.getTaskInfo();
  }

  getTaskInfo: any = () => {
    api.getTaskList({}).then((response: any) => {
      this.setState({ taskInfo: response.data });
      var readyData: Array<any> = new Array();
      var goingData: Array<any> = new Array();
      var finishData: Array<any> = new Array();
      response.data.map((item: any, index: any) => {
        if (item.taskStatus == 'ready') {
          readyData.push(item);
        } else if (item.taskStatus == 'going') {
          goingData.push(item);
        } else {
          finishData.push(item);
        }
      });
      this.setState({
        readyTaskIds: readyData,
        goingTaskIds: goingData,
        finishTaskIds: finishData,
      });
    });
  };

  onDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  }

  render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Row>
            <Col span="6">
              <Droppable droppableId="ready">
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot,
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: '#99CCFF',
                      margin: '0px 20px',
                      height: 700,
                      borderRadius: 3,
                    }}
                  >
                    <div
                      style={{
                        height: 45,
                        background: '#6699CC',
                        borderRadius: '5px 5px 0 0',
                      }}
                    >
                      <LikeFilled
                        style={{
                          color: '#fff',
                          display: 'inline-block',
                          marginLeft: 20,
                          fontSize: 18,
                        }}
                      />
                      <span
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          display: 'inline-block',
                          paddingTop: 8,
                          paddingLeft: 10,
                          fontSize: 18,
                        }}
                      >
                        未开始
                      </span>
                    </div>
                    {this.state.readyTaskIds.map((item: any, index: any) => (
                      <Draggable
                        key={item.taskId}
                        draggableId={item.taskId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              '#99CCFF',
                            )}
                          >
                            {item.taskName}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col span="6">
              <Droppable droppableId="going">
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot,
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: '#FFCC99',
                      margin: '0px 20px',
                      height: 700,
                      borderRadius: 3,
                    }}
                  >
                    <div
                      style={{
                        height: 45,
                        background: '#FF9900',
                        borderRadius: '5px 5px 0 0',
                      }}
                    >
                      <LikeFilled
                        style={{
                          color: '#fff',
                          display: 'inline-block',
                          marginLeft: 20,
                          fontSize: 18,
                        }}
                      />
                      <span
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          display: 'inline-block',
                          paddingTop: 8,
                          paddingLeft: 10,
                          fontSize: 18,
                        }}
                      >
                        进行中
                      </span>
                    </div>
                    {this.state.goingTaskIds.map((item: any, index: any) => (
                      <Draggable
                        key={item.taskId}
                        draggableId={item.taskId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              '#FF9900',
                            )}
                          >
                            {item.taskName}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            <Col span="6">
              <Droppable droppableId="finish">
                {(
                  provided: DroppableProvided,
                  snapshot: DroppableStateSnapshot,
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: '#99CC99',
                      margin: '0px 20px',
                      height: 700,
                      borderRadius: 3,
                    }}
                  >
                    <div
                      style={{
                        height: 45,
                        background: '#009966',
                        borderRadius: '5px 5px 0 0',
                      }}
                    >
                      <LikeFilled
                        style={{
                          color: '#fff',
                          display: 'inline-block',
                          marginLeft: 20,
                          fontSize: 18,
                        }}
                      />
                      <span
                        style={{
                          textAlign: 'left',
                          color: 'white',
                          display: 'inline-block',
                          paddingTop: 8,
                          paddingLeft: 10,
                          fontSize: 18,
                        }}
                      >
                        已完成
                      </span>
                    </div>
                    {this.state.finishTaskIds.map((item: any, index: any) => (
                      <Draggable
                        key={item.taskId}
                        draggableId={item.taskId}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              '#99CC33',
                            )}
                          >
                            {item.taskName}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </DragDropContext>
      </div>
    );
  }
}
