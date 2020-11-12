interface VoServiceInfoVersion {
    [key: string]: VoServiceInfoVersionModule;
}

interface VoServiceInfoVersionModule {
    env: string;
    serial: string;
}

export {
  VoServiceInfoVersion,
  VoServiceInfoVersionModule
}
