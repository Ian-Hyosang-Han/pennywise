import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../../api/expenseApi';

//A custom hook that handles fetching, adding, updating, and deleting all expense records
export const useExpenses = () => {
    return useQuery({
        queryKey: ['expenses'], // Use "expenses" as the query key
        queryFn: fetchExpenses, // A function that fetches data
    });
};

export const useAddExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addExpense, // A function that fetches data
        // Refetches all expense data on success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateExpense, // A function that updates data
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExpense, // A function that deletes data
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};