import React from "react";

export default function UplodeInterface() {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-zinc-900 text-white rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">xeooh3wuervwjpvng2fj</h2>
          <button className="text-gray-400 hover:text-white">✕</button>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border flex items-center justify-center">
              1
            </div>
            Details
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border flex items-center justify-center">
              2
            </div>
            Video elements
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
              ✓
            </div>
            Checks
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border flex items-center justify-center">
              4
            </div>
            Visibility
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left */}
          <div className="col-span-2 space-y-6">
            <div>
              <label className="text-sm text-gray-300">Title (required)</label>
              <input
                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none"
                placeholder="Add a title"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Description</label>
              <textarea
                rows="5"
                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 outline-none"
                placeholder="Tell viewers about your video"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <p className="text-sm text-gray-300 mb-3">Thumbnail</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="border border-dashed border-zinc-700 rounded-lg p-6 flex items-center justify-center text-gray-400">
                  Upload file
                </div>

                <div className="border border-dashed border-zinc-700 rounded-lg p-6 flex items-center justify-center text-gray-400">
                  Auto-generated
                </div>

                <div className="border border-dashed border-zinc-700 rounded-lg p-6 flex items-center justify-center text-gray-400">
                  A/B Testing
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div>
              <label className="text-sm text-gray-300">Playlists</label>
              <select className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2">
                <option>Select</option>
              </select>
            </div>

            {/* Audience */}
            <div>
              <p className="text-sm text-gray-300 mb-2">Audience</p>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" /> Yes, it's Made for Kids
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" /> No, it's not Made for Kids
                </label>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
            <div className="w-full h-40 bg-black rounded-md" />

            <div className="text-sm">
              <p className="text-gray-400">Video link</p>
              <p className="text-blue-400">https://youtu.be/xxxxx</p>
            </div>

            <div className="text-sm">
              <p className="text-gray-400">Filename</p>
              <p>video.webm</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-8">
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
