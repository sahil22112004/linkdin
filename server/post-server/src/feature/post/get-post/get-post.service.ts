import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { rePost } from 'src/domain/entities/rePost.entity';

@Injectable()
export class GetPostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(rePost) private rePostRepository: Repository<rePost>,
  ) {}

  async getAllPost(user: any, page: number, limit: number, sortBy: 'recent' | 'likes') {
    const posts = await this.postRepository.find({
      relations: ['likes'],
    });

    const reposts = await this.rePostRepository.find({
      relations: ['post_Id', 'post_Id.likes'],
    });

    const postFeed = posts.map(post => {
      const likeCount = post.likes.filter(like => !like.deletedAt).length;

      const isLiked = post.likes.some(
        like => like.user_Id === user.uid && !like.deletedAt,
      );

      return {
        feedId: `post-${post.id}`,
        ...post,
        likeCount,
        isLiked,
        repostedBy: null,
        repostedAt: null,
      };
    });

    const repostFeed = reposts.map(repost => {
      const post = repost.post_Id;

      const likeCount = post.likes.filter(like => !like.deletedAt).length;

      const isLiked = post.likes.some(
        like => like.user_Id === user.uid && !like.deletedAt,
      );

      return {
        feedId: `repost-${repost.id}`,
        ...post,
        likeCount,
        isLiked,
        repostedBy: repost.user_Id,
        repostedAt: repost.rePostedAt,
      };
    });

    let finalFeed = [...postFeed, ...repostFeed];

    if (sortBy === 'likes') {
      finalFeed = finalFeed.sort((a, b) => b.likeCount - a.likeCount);
    } else {
      finalFeed = finalFeed.sort(
        (a, b) =>
          new Date(b.repostedAt || b.createdAt).getTime() -
          new Date(a.repostedAt || a.createdAt).getTime(),
      );
    }

    const total = finalFeed.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + Number(limit);

    const paginatedFeed = finalFeed.slice(startIndex, endIndex);

    return {
      message: 'post fetch successfully',
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      allPost: paginatedFeed,
    };
  }
}

// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';

// @Injectable()
// export class GetPostService {
//   constructor(private dataSource: DataSource) {}

//   async getAllPost(user: any, page: number, limit: number, sortBy: 'recent' | 'likes') {
//     const offset = (page - 1) * limit;

//     const orderBy =
//       sortBy === 'likes'
//         ? 'likeCount DESC'
//         : 'COALESCE("repostedAt", "createdAt") DESC';
//  ON l."postId" = p.id
//       GROUP BY p.id
//     const query = `
//       SELECT 
//         p.id,
//         p.content,
//         p."createdAt",
//         COUNT(l.id) FILTER (WHERE l."deletedAt" IS NULL) as "likeCount",
//         BOOL_OR(l."user_Id" = $1 AND l."deletedAt" IS NULL) as "isLiked",
//         NULL as "repostedBy",
//         NULL as "repostedAt",
//         'post-' || p.id as "feedId"
//       FROM post p
//       LEFT JOIN likes l

//       UNION ALL

//       SELECT 
//         p.id,
//         p.content,
//         p."createdAt",
//         COUNT(l.id) FILTER (WHERE l."deletedAt" IS NULL) as "likeCount",
//         BOOL_OR(l."user_Id" = $1 AND l."deletedAt" IS NULL) as "isLiked",
//         r."user_Id" as "repostedBy",
//         r."rePostedAt" as "repostedAt",
//         'repost-' || r.id as "feedId"
//       FROM repost r
//       JOIN post p ON p.id = r."post_Id"
//       LEFT JOIN likes l ON l."postId" = p.id
//       GROUP BY p.id, r.id

//       ORDER BY ${orderBy}
//       LIMIT $2 OFFSET $3
//     `;

//     const data = await this.dataSource.query(query, [
//       user.uid,
//       limit,
//       offset,
//     ]);

//     return {
//       message: 'post fetch successfully',
//       page,
//       limit,
//       allPost: data,
//     };
//   }
// }

