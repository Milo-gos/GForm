import { useInfiniteQuery } from '@tanstack/react-query';
import { getSurveysOfCurrentUser } from '../../../API/axios';

const useGetSurveyOfCurrentUserQuery = (searchString: string, value: string) => {
    return useInfiniteQuery({
        queryKey: [`getSurveyOfCurrentUser`, searchString, value],
        queryFn: getSurveysOfCurrentUser,
        refetchOnWindowFocus: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        retry: 0,
    });
};

export default useGetSurveyOfCurrentUserQuery;
