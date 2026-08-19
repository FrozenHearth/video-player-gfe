export type PlayerState = -1 | 0 | 1 | 2 | 3 | 5;

export const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

export type PlayerError = 2 | 5 | 100 | 101 | 150 | 153;

export const PlayerError = {
  INVALID_PARAM: 2,
  HTML5: 5,
  NOT_FOUND: 100,
  NOT_EMBEDDABLE: 101,
  NOT_EMBEDDABLE_DISGUISED: 150,
  MISSING_REFERER: 153,
};

export type PlayerVars = {
  autoplay?: 0 | 1;
  controls?: 0 | 1;
  cc_load_policy?: 0 | 1;
  cc_lang_pref?: string;
  playsinline?: 0 | 1;
};

export type PlayerEvent<T = unknown> = {
  target: YouTubePlayer;
  data: T;
};

export type PlayerEvents = {
  onReady?: (event: PlayerEvent<undefined>) => void;
  onStateChange?: (event: PlayerEvent<PlayerState>) => void;
  onError?: (event: PlayerEvent<PlayerError>) => void;
  onPlaybackRateChange?: (event: PlayerEvent<number>) => void;
  onApiChange?: (event: PlayerEvent<undefined>) => void;
};

export type PlayerOptions = {
  videoId?: string;
  width?: number | string;
  height?: number | string;
  playerVars?: PlayerVars;
  events?: PlayerEvents;
};

export type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => PlayerState;
  setPlaybackRate: (suggestedRate: number) => void;
  getPlaybackRate: () => number;
  getAvailablePlaybackRates: () => number[];
  loadVideoById: (videoId: string, startSeconds?: number) => void;
  getOptions: (module?: string) => string[];
  getOption: (module: string, option: string) => unknown;
  setOption: (module: string, option: string, value: unknown) => void;
  getIframe: () => HTMLIFrameElement;
  destroy: () => void;
};

export type YouTubeNamespace = {
  Player: new (
    element: HTMLElement | string,
    options: PlayerOptions,
  ) => YouTubePlayer;
  PlayerState: typeof PlayerState;
};

declare global {
  interface Window {
    Youtube?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}
