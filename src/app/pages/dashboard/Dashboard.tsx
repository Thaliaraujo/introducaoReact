import { useCallback, useEffect, useState } from 'react';

import { ApiException } from '../../shared/services/api/ApiException';
import { ITask, TaskService } from '../../shared/services/api/task/TaskService';


export const Dashboard = () => {
  const [list, setList] = useState<ITask[]>([]);

    useEffect(() => {
        TaskService.getAll()
        .then((result) => {
            if (result instanceof ApiException) {
            alert(result.message);
            } else {
            setList(result);
            }
        });
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;

            e.currentTarget.value = '';

            if (list.some((listItem) => listItem.title === value)) return;

            TaskService.create({ title: value, isCompleted: false })
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setList((oldList) => [...oldList, result] as ITask[]);
                };
            });
        }
    }, [list]);

    const handleToggleComplete = useCallback((id: number) => {
        const taskToUpdate = list.find((task) => task.id === id);
        if (!taskToUpdate) return;

        TaskService.updateById(id, {
        ...taskToUpdate,
        isCompleted: !taskToUpdate.isCompleted,
        })
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setList(oldList  => {
                    
                    return oldList.map(oldListItem => {
                        if (oldListItem.id === id) {
                            return { ...oldListItem, ...result } as ITask;
                        }
                        return oldListItem;
                    });
                });
            }
        });
    }, [list]);

    const handleDelete = useCallback((id: number) => {
        TaskService.deleteById(id)
        .then((result) => {
            if (result instanceof ApiException) {
                alert(result.message);
            } else {
                setList(oldList => {
                    return oldList.filter(oldListItem => oldListItem.id !== id);
                });
            };
        });
    }, []);

    return (
        <div>
            <p>Lista</p>

            <input onKeyDown={handleInputKeyDown} />

            <p>{list.filter((listItem) => listItem.isCompleted).length}</p>

            <ul>
                {list.map((listItem) => {
                return <li key={listItem.id}>
                    <input
                    type="checkbox"
                    checked={listItem.isCompleted}
                    onChange={() => handleToggleComplete(listItem.id)}
                    />

                    {listItem.title}

                    <button onClick={() => handleDelete(listItem.id)}>Apagar</button>
                </li>;
                })}
            </ul>
        </div>
    );
};
// import { ITask, TaskService } from "../../shared/services/api/task/TaskService";
// import { ApiException } from "../../shared/services/api/ApiException";

// export const Dashboard = () => {
//     const [list, setList] = useState<ITask[]>([]);

//     useEffect(() => {
//        TaskService.getAll()
//         .then((result) => {
//             if(result instanceof ApiException) {
//                 alert(result.message);
//             } else {
//                 setList(result);
//             };
//         });
//     }, []);

//     const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
//         if(e.key === 'Enter') {
//             if(e.currentTarget.value.trim().length === 0) return;

//             const value = e.currentTarget.value;

//             e.currentTarget.value = '';

//             if(list.some((ListItem) => ListItem.title === value)) return

//             TaskService.create({title: value, isCompleted: false})
//             .then((result) => {
//                 if(result instanceof ApiException) {
//                     alert(result.message);
//                 } else {
//                     setList((oldList) => [...oldList, result] as ITask[]);
//                 };
//             });
//         };
//     }, [list]);

//     const handleToggleComplete = useCallback((id: number) => {
//         const taskToUpdate = list.find((task) => task.id === id);
//         if (!taskToUpdate) return;
    
//        TaskService.updateById(id, {
//           ...taskToUpdate,
//           isCompleted: !taskToUpdate.isCompleted,
//         })
//           .then((result) => {
//             if (result instanceof ApiException) {
//               alert(result.message);
//             } else {
//               setList(oldList => {
//                 return oldList.map(oldListItem => {
//                   if (oldListItem.id === id) return result;
//                   return oldListItem;
//                 });
//               });
//             }
//           });
//       }, [list]);

//     //     const taskToUpdate = list.find((task) => task.id === id);
//     //     if(!taskToUpdate) return;

//     //     TaskService.updateById(id, {
//     //         ...taskToUpdate,
//     //         isCompleted: !taskToUpdate.isCompleted,
//     //     })
//     //         .then((result) => {
//     //             if(result instanceof ApiException) {
//     //                 alert(result.message);
//     //             } else {
//     //                 setList((oldList) => {
//     //                     return oldList.map((oldListItem) => {
//     //                         if (oldListItem.id === id) {
//     //                             return result;
//     //                         }
//     //                         return oldListItem;
//     //                     });
//     //                 });
//     //             };
//     //         });
//     // }, [list]);

//     return(
//         <div>
//             <p>Lista</p>

//             <input onKeyDown={handleInputKeyDown} />

//             <p>{list.filter((ListItem) => ListItem.isCompleted).length}</p>

//             <ul>
//                 {list.map((ListItem) => {
//                     return(
//                         <li key={ListItem.id}>
//                             <input 
//                                 type="checkbox" 
//                                 checked={ListItem.isCompleted}
//                                 onChange={() => handleToggleComplete(ListItem.id)}
//                             />
//                             {ListItem.title}
//                         </li>
//                     );
//                 })}
//             </ul>
//         </div>
//     );
// };