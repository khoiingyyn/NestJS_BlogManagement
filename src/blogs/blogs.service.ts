/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Blog, BlogStatus } from './blog.model';
import { v4 as uuid } from 'uuid';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogsFilterDto } from './dto/get-blogs-filter.dto';
import { NotFoundException } from '@nestjs/common/exceptions';

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

        // try to get blog
        const found = this.blogs.find( (blog)=> blog.id == id);

        // not fonud? -> throw error
        if(!found){
            throw new NotFoundException('Your ID of Blog is not found !');
        }

        // else return blog 
        return found;
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
        const found = this.getBlogById(id);
        this.blogs = this.blogs.filter((blog) => blog.id !== found.id);
    }

    updateBlogStatus(id: string, status: BlogStatus){
        const blog = this.getBlogById(id);
        blog.status = status;
        return blog;
    }

}
