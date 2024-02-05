import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviePosterComponent } from 'src/app/shared/movie-poster.component';

interface MovieResult {
  results: any[];
}

interface HomeResults {
  bannerResult: MovieResult;
  trendingMovieResult: MovieResult;
  actionMovieResult: MovieResult;
  adventureMovieResult: MovieResult;
  animationMovieResult: MovieResult;
  comedyMovieResult: MovieResult;
  documentaryMovieResult: MovieResult;
  scienceFictionMovieResult: MovieResult;
  thrillerMovieResult: MovieResult;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MoviePosterComponent]
})
export class HomeComponent implements OnInit {

  results: HomeResults = {
    bannerResult: { results: [] },
    trendingMovieResult: { results: [] },
    actionMovieResult: { results: [] },
    adventureMovieResult: { results: [] },
    animationMovieResult: { results: [] },
    comedyMovieResult: { results: [] },
    documentaryMovieResult: { results: [] },
    scienceFictionMovieResult: { results: [] },
    thrillerMovieResult: { results: [] },
  };

  constructor(private service: MovieApiService, private title: Title, private meta: Meta) {
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    this.fetchData();
  }

  private setTitleAndMetaTags() {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });
  }

  private fetchData() {
    this.fetchDataByCategory('bannerApiData', 'bannerResult');
    this.fetchDataByCategory('trendingMovieApiData', 'trendingMovieResult');
    this.fetchDataByCategory('fetchActionMovies', 'actionMovieResult');
    this.fetchDataByCategory('fetchAdventureMovies', 'adventureMovieResult');
    this.fetchDataByCategory('fetchAnimationMovies', 'animationMovieResult');
    this.fetchDataByCategory('fetchComedyMovies', 'comedyMovieResult');
    this.fetchDataByCategory('fetchDocumentaryMovies', 'documentaryMovieResult');
    this.fetchDataByCategory('fetchScienceFictionMovies', 'scienceFictionMovieResult');
    this.fetchDataByCategory('fetchThrillerMovies', 'thrillerMovieResult');
  }
  
  private fetchDataByCategory(apiMethod: string, resultArray: keyof HomeResults) {
    this.service[apiMethod]().subscribe(
      (result: MovieResult) => {
        this.results[resultArray] = result;
      },
      (error: any) => {
        console.error(`Error fetching data for ${resultArray}:`, error);
      }
    );
  }
}
