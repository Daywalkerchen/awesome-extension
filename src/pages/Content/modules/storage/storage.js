// All configurable plugin-options
const settingKeys = [
    { key: "useEmotes", _default: false },
];

const injectFunc = (fn) => {
    const script = document.createElement("script");
    script.text = `(${fn.toString()})();`;

    (document.head || document.documentElement).appendChild(script);

    script.parentNode.removeChild(script);
};

export const initializeStorage = () => {
    // Add listener for setting changes
    document.addEventListener(
      "UPDATE_SETTING",
      ({ detail }) => {
          chrome.storage.local.set({ ...detail });
      }
    );

    // Inject current settings to window
    chrome.storage.sync.get(
      settingKeys.map(({ key }) => key),
      (storageConfig) => {
          const pluginConfig = {};

          settingKeys.forEach(({ key, _default }) => {
              pluginConfig[key] = _default;
          });

          Object.keys(storageConfig)
            .forEach((key) => {
                if (storageConfig[key] !== undefined) {
                    if (key === "dockSize" && storageConfig[key] < 0.1) {
                        pluginConfig[key] = 0.1;
                    } else {
                        pluginConfig[key] = storageConfig[key];
                    }
                }
            });

          injectFunc(() => {
              console.log("INJECT");
              document.addEventListener(
                "INJECT_WINDOW",
                ({ detail }) => {
                    window.blobdanceSettings = detail;
                }
              );
          });

          document.dispatchEvent(new CustomEvent(
            "INJECT_WINDOW",
            {
                detail: pluginConfig
            }
          ));
      }
    );
};