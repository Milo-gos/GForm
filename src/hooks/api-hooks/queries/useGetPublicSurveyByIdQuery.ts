import { useQuery } from '@tanstack/react-query';
import { getPublicSurveyById } from '../../../API/axios';

const useGetPublicSurveyByIdQuery = (id: string) => {
    return useQuery({
        queryKey: [`getPublicSurveyById_${id}`],
        queryFn: () => getPublicSurveyById(id),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};

export default useGetPublicSurveyByIdQuery;
