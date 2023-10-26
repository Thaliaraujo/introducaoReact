import {useCallback, useState } from "react";


interface IListItem {
    title: string;
    isSelected: boolean;
}


export const Dashboard = () => {

    const [list, setList] = useState<IListItem[]>([]);

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
                        title: value,
                        isSelected: false
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

            <p>{list.filter((ListItem) => ListItem.isSelected).length}</p>

            <ul>
                {list.map((ListItem) => {
                    return(
                        <li key={ListItem.title}>
                            <input 
                                type="checkbox" 
                                checked={ListItem.isSelected}
                                onChange={() =>{
                                    setList(oldList => {
                                        return oldList.map(oldListItem => {
                                            const newIsSelected = oldListItem.title === ListItem.title
                                            ? !oldListItem.isSelected
                                            : oldListItem.isSelected;

                                            return{
                                                 ...oldListItem,
                                                isSelected: newIsSelected,
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