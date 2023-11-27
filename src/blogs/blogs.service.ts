/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Blog } from './blog.model';
import { v4 as uuid } from 'uuid';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
    private blogs: Blog[] = [];
    
    getAllBlogs(): Blog[] {
        return this.blogs;
    }

    getBlogById (id:string):Blog {
        return this.blogs.find( (blog)=> blog.id == id);
    }

    createBlog(createBlogDto: CreateBlogDto): Blog {
        const { title, content, author, date} = createBlogDto;

        const blog: Blog =
        {
            id: uuid(),
            title,
            content,
            author,
            date
        };

        this.blogs.push(blog);
        return blog;
    }

    deleteBlog(id: string): void {
        this.blogs = this.blogs.filter((blog) => blog.id !== id);
    }
}
