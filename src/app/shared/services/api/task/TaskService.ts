import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface ITask {
    id: number;
    title: string;
    isCompleted: boolean;
};

const getAll = async (): Promise<ITask[] | ApiException> => {
    try {
        const {data} = await Api().get('/tarefas');
        return data;
    } catch(error: any) {
        return new ApiException(error.message || 'Erro ao consultar registros')
    };
};

const getById = async (id: number): Promise<ITask | ApiException> => {
    try {
        const {data} = await Api().get(`/tarefas/${id}`);
        return data;
    } catch(error: any) {
        return new ApiException(error.message || 'Erro ao consultar registro')
    };
};

const create = async (dataToCreate: Omit<ITask, 'id'>): Promise<ITask[] | ApiException> => {
    try {
        const {data} = await Api().post<any>('/tarefas', dataToCreate);
        return data;
    } catch(error: any) {
        return new ApiException(error.message || 'Erro ao consultar criar registro')
    };
};
   
const updateById = async (id: string, dataToUpdate: ITask): Promise<ITask[] | ApiException> => {
    try {
        const {data} = await Api().put(`/tarefas/${id}`, dataToUpdate);
        return data;
    } catch(error: any) {
        return new ApiException(error.message || 'Erro ao atualizar o registro')
    };
};
   
const deleteById  = async (id: string): Promise<undefined | ApiException> => {
    try {
        await Api().get(`/tarefas/${id}`);
        return undefined;
    } catch(error: any) {
        return new ApiException(error.message || 'Erro ao deletar registro')
    };
};
 
export const TaskService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
