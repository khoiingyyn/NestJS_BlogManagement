/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Blog, BlogStatus } from './blog.model';
import { v4 as uuid } from 'uuid';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';

@Injectable()
export class BlogsService {
    private blogs: Blog[] = [];
    
    getAllBlogs(): Blog[] {
        return this.blogs;
    }

    getBlogWithFilters(filterDto: GetBlogsFilterDto): Blog[] {
        const { status, search} = filterDto;
        //1. define 1 empty array to contain the result
        let blogs = this.getAllBlogs();
        //2. do with status
        if (status){
            blogs = blogs.filter((blogs) => blogs.status === status );
        }
        //3. do with search
        if(search){
            blogs = blogs.filter((blogs) => {
                if (blogs.title.includes(search)
                || blogs.content.includes(search) 
                || blogs.author.includes(search)
                ) {
                return true;
                }
            
            return false;
        });
        }
        //4. return final result
        return blogs;
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
            date,
            status: BlogStatus.PENDING,
        };

        this.blogs.push(blog);
        return blog;
    }

    deleteBlog(id: string): void {
        this.blogs = this.blogs.filter((blog) => blog.id !== id);
    }

    updateBlogStatus(id: string, status: BlogStatus){
        const blog = this.getBlogById(id);
        blog.status = status;
        return blog;
    }

}
