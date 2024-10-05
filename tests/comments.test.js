import { Comments } from "../comments";

test('Should return comments for requested page', () => {
    // given
    const comments = new Comments([], {a: {comments:[]}, b: {comments:[]}});
    comments.addComment('a', 'first');

    // test
    expect(comments.getPageComments('a')).toHaveLength(1);
    expect(comments.getPageComments('b')).toHaveLength(0);
});

test('Should return propper comment content for page', () => {
    // given
    const comments = new Comments([], {a: {comments:[]}, b: {comments:[]}});
    comments.addComment('a', 'first');

    // test
    expect(comments.getPageComments('a')).toEqual([{content: 'first'}]);
});


test('Should delete user comments', () => {
    // given
    const comments = new Comments([], {a: {comments:[]}, b: {comments:[]}});
    comments.addComment('a', 'first', 'harry');
    comments.addComment('a', 'second', 'harry');
    comments.addComment('b', 'second', 'ronald');

    // test
    expect(comments.getPageComments('a')).toEqual(3);

    // action
    comments.deleteByUser('harry');

    // test
    expect(comments.getPageComments('a')).toEqual(1);
});