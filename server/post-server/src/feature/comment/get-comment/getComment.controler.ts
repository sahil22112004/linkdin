import { Controller, Get, Param, Query } from '@nestjs/common'
import { FetchCommentService } from './getComment.service'
import type { FetchCommentQuery } from '../../../domain/interfaces/commentQuery.interface'

@Controller('comment')
export class FetchCommentController {

    constructor(
        private readonly fetchCommentService: FetchCommentService
    ){}

    @Get(':postId')
    fetchComments(
        @Param('postId') postId: string,
        @Query() query: FetchCommentQuery
    ){

        const parentId = query.parentId || null
        const limit = Number(query.limit) || 10
        const offset = Number(query.offset) || 0

        return this.fetchCommentService.fetchComments(
            postId,
            parentId,
            limit,
            offset
        )
    }

}