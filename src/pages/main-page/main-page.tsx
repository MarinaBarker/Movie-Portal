import { useState } from "react";
import  { Preloader } from "../../components/preloader/preloader";
import Search from "../../components/search/search";
import MovieList from "../../components/movie-list/movie-list";
import { useGetListMoviesQuery } from "../../utils/api";
import { MyPagination } from "../../components/pagination/pagination";
import Filter from "../../components/filter/filter";
import { useDebounce } from "../../hooks/useDebounce";

export const MainPage = () => {
	const [searchParam, setSearchParam] = useState('')
	const [page, setPage] = useState(1);
	const [type, setType] = useState('');

	let debouncedValue = useDebounce(searchParam, 800);

 	const { data, isLoading } = useGetListMoviesQuery({ 
		searchParam: debouncedValue, 
		page, 
		type, 
	});

	const handleChangePage = (async (page: number) => {
		setPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	if (isLoading) return <Preloader />

  return (
		<main className="section">
			<section className="container">
				<Search
					setSearchTerm={setSearchParam}
					results={data?.Search || []}
				/>
				{ data &&
					<><Filter setTypeParam={setType} />
					<MovieList movies={data?.Search}/>
					<MyPagination 
						total={Number(data?.totalResults || [])} 
						current={page} 
						onChangePage={handleChangePage}
					/></>
				}
			</section>
		</main>
	);
}