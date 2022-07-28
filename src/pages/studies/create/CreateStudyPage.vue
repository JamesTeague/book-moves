<template>
  <div class="container mx-auto">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Create a Study
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Please remember to only upload PGNs for which you have the rights to
            publish them. This is especially true, but not limited, for PGN
            files that you have acquired from paid platforms.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="onSubmit" action="#" method="POST">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div class="grid grid-cols-3 gap-6">
                <div class="col-span-3 sm:col-span-2">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                    >Study Title</label
                  >
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autocomplete="given-name"
                    placeholder="Queen's Gambit Declined"
                    @input="
                      (event) =>
                        send('STUDY_UPDATED', {
                          data: { title: event.target.value },
                        })
                    "
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  for="about"
                  class="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    @input="
                      (event) =>
                        send('STUDY_UPDATED', {
                          data: { description: event.target.value },
                        })
                    "
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="In this study..."
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Brief description for your study. URLs are hyperlinked.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  PGN
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          disabled
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="company-website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Lichess Study
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span
                    class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
                  >
                    https://
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    @input="
                      (event) =>
                        send('STUDY_UPDATED', {
                          data: { studyLink: event.target.value },
                        })
                    "
                    class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    placeholder="lichess.org/study/AKshueIE"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="color"
                  class="block text-sm font-medium text-gray-700"
                  >Study Color</label
                >
                <select
                  id="color"
                  name="color"
                  autocomplete="color"
                  @input="
                    (event) =>
                      send('STUDY_UPDATED', {
                        data: { studyColor: event.target.value },
                      })
                  "
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                v-if="state.matches('creating')"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                type="button"
                v-if="state.matches('submitting')"
                class="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              >
                <span
                  class="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
                Saving
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import { useMachine } from '@xstate/vue';
import { createCreateStudyMachine } from '../../../machines/createStudyMachine';
import { useRouter } from 'vue-router';

// eslint-disable-next-line no-undef
const { pgnService, uploadService } = inject('services') as App.Services;
const { state, send } = useMachine(
  createCreateStudyMachine(uploadService, pgnService),
  {
    devTools: true,
  },
);
const router = useRouter();

const onSubmit = () => {
  send('STUDY_SUBMITTED');
};

watch(state, (state) => {
  if (state.matches('complete')) {
    router.push('/study');
  }
});
</script>

<style />
