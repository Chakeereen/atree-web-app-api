// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; 

/**
 * @swagger
 * /api/posts:
 * get:
 * description: Returns all posts
 * responses:
 * 200:
 * description: A list of posts
 */
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/posts:
 * post:
 * description: Creates a new post
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * responses:
 * 201:
 * description: The created post
 */
export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
