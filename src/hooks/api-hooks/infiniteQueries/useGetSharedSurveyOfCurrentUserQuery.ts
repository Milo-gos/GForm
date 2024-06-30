import { useInfiniteQuery } from '@tanstack/react-query';
import { getSharedSurveysOfCurrentUser } from '../../../API/axios';

const useGetSharedSurveyOfCurrentUserQuery = (searchString: string, value: string) => {
    return useInfiniteQuery({
        queryKey: [`getSharedSurveyOfCurrentUser`, searchString, value],
        queryFn: getSharedSurveysOfCurrentUser,
        refetchOnWindowFocus: false,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
};

export default useGetSharedSurveyOfCurrentUserQuery;
