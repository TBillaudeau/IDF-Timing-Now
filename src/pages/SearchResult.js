import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation, useNavigate } from "react-router-dom";
import StationInfo from '../components/stationHeader';
import TrainInfo from '../components/Timing';

function SearchResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    let lines = params.getAll('line');
    let stopAreas = params.getAll('stop_area');

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(lines);
        const stopItems = Array.from(stopAreas);
        const [reorderedItem] = items.splice(result.source.index, 1);
        const [reorderedStopItem] = stopItems.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        stopItems.splice(result.destination.index, 0, reorderedStopItem);

        lines = items;
        stopAreas = stopItems;
        const newParams = new URLSearchParams();
        lines.forEach((line, index) => {
            newParams.append('line', line);
            newParams.append('stop_area', stopAreas[index]);
        });
        navigate('?' + newParams.toString(), { replace: true });
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="lines">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={`grid m-1 ${lines.length === 1 ? 'grid-cols-1 max-w-screen-sm' : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'} gap-2 lg:gap-4 sm:m-6`}>
                        {lines.map((line, index) => (
                            <Draggable key={line} draggableId={line} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <StationInfo lineID={line} stationID={stopAreas[index]} />
                                        <TrainInfo lineID={line} stationName={stopAreas[index]} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default SearchResult;