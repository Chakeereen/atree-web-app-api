// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

interface Params {
  params: { id: string };
}

/**
 * @swagger
 * /api/posts/{id}:
 * get:
 * description: Returns a single post by ID
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: A single post
 * 404:
 * description: Post not found
 */
export async function GET(request: Request, { params }: Params) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id) },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/posts/{id}:
 * put:
 * description: Updates a post
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: string
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
 * published:
 * type: boolean
 * responses:
 * 200:
 * description: The updated post
 */
export async function PUT(request: Request, { params }: Params) {
    try {
        const { title, content, published } = await request.json();
        const updatedPost = await prisma.post.update({
            where: { id: Number(params.id) },
            data: {
                title,
                content,
                published,
            },
        });
        return NextResponse.json(updatedPost);
    } catch (error) {
        // Handle case where post to update is not found
        if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/posts/{id}:
 * delete:
 * description: Deletes a post
 * parameters:
 * - name: id
 * in: path
 * required: true
 * schema:
 * type: string
 * responses:
 * 204:
 * description: Post deleted successfully
 */
export async function DELETE(request: Request, { params }: Params) {
    try {
        await prisma.post.delete({
            where: { id: Number(params.id) },
        });
        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        // Handle case where post to delete is not found
        if (error instanceof Error && 'code' in error && (error as any).code === 'P2025') {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}