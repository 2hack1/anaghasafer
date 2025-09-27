import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// import { RouterLink } from "../../../../../node_modules/@angular/router/router_module.d-DIceKvcB";

@Component({
  selector: 'app-blog',
  imports: [RouterLink,CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
categories = ['All', 'Destinations', 'Hotels', 'Travel Tips', 'Tours', 'Experiences'];

featuredPosts = [
  {
    title: 'Top 5 Beaches in Goa You Must Visit',
    img: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    excerpt: 'Experience the sun, sand, and sea at these top beaches in Goa. Perfect for a relaxing getaway.',
    link: '/blog/goa-beaches'
  },
  {
    title: 'Luxury Hotels with Amazing Views',
    img: 'https://cdn-icons-png.flaticon.com/512/2331/2331583.png',
    excerpt: 'Check out the best luxury hotels in India offering breathtaking views and top-notch hospitality.',
    link: '/blog/luxury-hotels'
  }
];

blogPosts = [
  {
    title: 'Adventure Tours You Must Try',
    img: 'https://cdn-icons-png.flaticon.com/512/861/861060.png',
    date: '15 Sep 2025',
    author: 'Anagha Safar Team',
    excerpt: 'Explore thrilling adventure tours from trekking and rafting to wildlife safaris...',
    link: '/blog/adventure-tours',
    readTime: 6,
    likes: 120,
    comments: 15
  },
  {
    title: 'How to Travel Responsibly',
    img: 'https://cdn-icons-png.flaticon.com/512/4146/4146603.png',
    date: '10 Sep 2025',
    author: 'Anagha Safar Team',
    excerpt: 'Tips on responsible travel practices that protect the environment and support local communities...',
    link: '/blog/responsible-travel',
    readTime: 5,
    likes: 90,
    comments: 10
  },
  {
    title: 'Top Hill Stations to Visit in India',
    img: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    date: '05 Sep 2025',
    author: 'Anagha Safar Team',
    excerpt: 'Beat the heat and relax at these serene hill stations with stunning views and cool weather.',
    link: '/blog/hill-stations',
    readTime: 7,
    likes: 150,
    comments: 20
  }
];


}
