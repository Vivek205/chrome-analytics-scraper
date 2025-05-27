export type ScrapedMetrics = {
  ratingsCount?: number;
  ratingsValue?: number;
  activeUsers?: number;
};

export type ScrapedData = {
  extensionId: string;
  extensionName: string;
  extensionUrl: string;
  metrics: {
    activeUsers?: number;
    ratingsCount?: number;
    ratingsValue?: number;
  };
};
