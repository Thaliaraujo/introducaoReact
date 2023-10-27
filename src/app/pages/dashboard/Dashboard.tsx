import {useCallback, useEffect, useState } from "react";
import { ITask, TaskService } from "../../shared/services/api/task/TaskService";
import { ApiException } from "../../shared/services/api/ApiException";

export const Dashboard = () => {
    const [list, setList] = useState<ITask[]>([]);

    useEffect(() => {
       TaskService.getAll()
        .then((result) => {
            if(result instanceof ApiException) {
                alert(result.message);
            } else {
                setList(result);
            };
        });
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if(e.key === 'Enter') {
            if(e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            setList((oldList) => {

                if(oldList.some((ListItem) => ListItem.title === value)) return oldList;

                return [
                    ...oldList,
                    {
                        id: oldList.length,
                        title: value,
                        isCompleted: false
                    }
                ];
            });
        };
    }, []);

    return(
        <div>
            <p>Lista</p>

            <input 
                onKeyDown={handleInputKeyDown}
            />

            <p>{list.filter((ListItem) => ListItem.isCompleted).length}</p>

            <ul>
                {list.map((ListItem) => {
                    return(
                        <li key={ListItem.title}>
                            <input 
                                type="checkbox" 
                                checked={ListItem.isCompleted}
                                onChange={() =>{
                                    setList(oldList => {
                                        return oldList.map(oldListItem => {
                                            const newIsCompleted = oldListItem.title === ListItem.title
                                            ? !oldListItem.isCompleted
                                            : oldListItem.isCompleted;

                                            return{
                                                 ...oldListItem,
                                                isCompleted: newIsCompleted,
                                            }; 
                                        });
                                    });
                                }}
                            />
                            {ListItem.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};