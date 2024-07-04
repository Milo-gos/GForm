import { useQuery } from '@tanstack/react-query';
import { getSurveyById } from '../../../API/axios';

const useGetSurveyByIdQuery = (id: string) => {
    return useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: () => getSurveyById(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};

export default useGetSurveyByIdQuery;
