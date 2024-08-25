import { Comments } from "../comments";

const comments = new Comments([], {a: {comments:[]}, b: {comments:[]}});

test('Should return comments for page', () => {
    // given
    comments.addComment('a', 'first');
    comments.addComment('a', 'second');
    comments.addComment('b', 'third');

    // test
    expect(comments.getPageComments('a')).toHaveLength(2);
    expect(comments.getPageComments('b')).toHaveLength(1);
});