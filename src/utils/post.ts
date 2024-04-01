import type { Post } from '../types';
import { getFileCommitDate } from './git';

export const getLastUpdated = ( entry: Post): Date | undefined => {
    const currentFilePath = `src/content/post/` + entry.id;
    let date = undefined;
    if (!date) {
        try {
            ({ date } = getFileCommitDate(currentFilePath, 'newest'));
        } catch(e) {
            console.log(e);

        }
    }
    return date;
};

export const getCreatedDate = ( entry: Post): Date | undefined => {
    const currentFilePath = `src/content/post/` + entry.id;
    let date = undefined;
    if (!date) {
        try {
            ({ date } = getFileCommitDate(currentFilePath, 'oldest'));
        } catch(e) {
            console.log(e);
        }
    }
    return date;
}
