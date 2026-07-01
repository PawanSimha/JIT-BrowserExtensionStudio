export function scanHtmlComments(): string[] {
  const comments: string[] = [];

  const walker = document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_COMMENT,
    null,
  );

  let node: Comment | null;
  while ((node = walker.nextNode() as Comment | null)) {
    const text = node.textContent?.trim();
    if (text) {
      comments.push(text.slice(0, 200));
    }
  }

  return comments;
}
