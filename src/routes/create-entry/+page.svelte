<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Retvrn from '../../components/retvrn.svelte';
  import Input from '../../components/input.svelte'
  import SelectInput from '../../components/select.svelte';
  import DropdownTextfield from '../../components/dropdownTextfield.svelte';
  import Button from '../../components/button.svelte';
  import Tags from '../../globals/tags.json';

  let title = $state('');
  let location = $state('');
  let latitude = $state('');
  let longitude = $state('');
  let zoningTag = $state('');
  let progressTag = $state('');
  let description = $state('');
  let error = $state('');
  let success = $state(false);
  let submitting = $state(false);
  let suggestions = $state([]);

  const suggestionsHidden = $derived(suggestions.length === 0);

  let handleLocationAutosuggestion = async (event) => {
    if (location.length > 3) {
      const token = localStorage.getItem('access_token');
      const authHeader = token;
      const response = await fetch(
        `${PUBLIC_BACKEND_URL}/autocomplete-address?query=${location}`, {
          headers: {
            ...(authHeader ? { Authorization: authHeader } : {})
          }
        }
      );

      const data = await response.json();

      suggestions = data;
    }
  }

  let handleSelectSuggestion = (suggestionName) => {
    const suggestionObject = suggestions.find(
      suggestion => suggestion.address == suggestionName
    );

    location = suggestionObject.address;
    longitude = suggestionObject.lon;
    latitude = suggestionObject.lat;
    suggestions = [];
  }

let handleGetCurrentLocation = async () => {
  if (!navigator.geolocation) {
    error = 'Geolocation is not supported by your browser';
    return;
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const data = await response.json();
    location = data.display_name || `${latitude}, ${longitude}`;
  } catch (err) {
    console.error('Geolocation error:', err);

    if (err.code === 1) {
      error = 'Location access denied. Please enable location permissions.'
    } else {
      error = 'Unable to get your location. Please try again.'
    }
  }
}

  let handleSubmit = async () => {
    error = '';
    success = false;
    submitting = true;

    const data = {
      title,
      location,
      longitude: longitude || -81.3792,
      latitude: latitude || 28.5383,
      tags: [
        { name: zoningTag, classification: 'Zoning' },
        { name: progressTag, classification: 'Progress' }
      ],
      description
    };

    try {
      const token = localStorage.getItem('access_token');
      const authHeader = token;

      const response = await fetch(`${PUBLIC_BACKEND_URL}/create-entry`, {
        method: 'POST',
        headers: {
          ...(authHeader ? { Authorization: authHeader } : {}),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        let body;
        try {
          body = await response.json();
        } catch {
          body = await response.text().catch(() => null);
        }
        const serverMsg =
          (body && (body.error || body.message || JSON.stringify(body))) ||
          response.statusText ||
          `HTTP ${response.status}`;
        error = `Server error: ${serverMsg}`;
        throw new Error(error);
      }

      const result = await response.json();
      console.log('Success:', result);
      success = true;
    } catch (e) {
      console.error('Submit error:', e);
      if (!error) error = e.message || 'An unknown error occurred';
    } finally {
      submitting = false;
    }
  };
</script>

<div class="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-start justify-center py-12 px-4">
  <div class="w-full max-w-2xl">
    <div class="flex items-center gap-3 mb-6">
      <Retvrn />
      <h1 class="text-2xl font-semibold text-slate-800">
        Add an entry — help your neighbor know what's up
      </h1>
    </div>

    <form onsubmit={handleSubmit}
          class="bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-slate-100">
      <p class="text-sm text-slate-500 mb-4">
        Share a short title, location and details. Fields marked with <span class="font-medium">*</span> are required.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            bind:value={title}
            id="title"
            label="Title *"
            placeholder="e.g. Road closed near Elm St."
            class="w-full"
            required
            aria-required="true"
          />
        </div>

        <div class="sm:col-span-2">
          <label for="location" class="block text-sm font-medium text-slate-700 mb-1">
            Location *
          </label>
          <div class="flex flex-row items-start gap-2">
            <div class="flex-1">
              <DropdownTextfield
                suggestionsHidden={suggestionsHidden}
                suggestions={suggestions.map(suggestion => suggestion.address)}
                handleInput={handleLocationAutosuggestion}
                selectSuggestion={handleSelectSuggestion}
                bind:searchValue={location}
              />
            </div>
            <Button
              onClick={() => handleGetCurrentLocation()}
              text="Get Current Location"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <Input
            bind:value={description}
            id="description"
            label="Description"
            placeholder="Add context, ETA, or contact info..."
            rows={4}
            class="w-full"
            textarea={true}
          />
        </div>

        <div>
          <SelectInput
            id="progressTagsSelect"
            label="Progress Tag *"
            bind:value={progressTag}
            options={Tags.filter(tag => tag.classification === "Progress").map(t => t.name)}
            required={true}
            class="w-full"
            aria-required="true"
          />
        </div>

        <div>
          <SelectInput
            id="zoningTagsSelect"
            label="Zoning Tag *"
            bind:value={zoningTag}
            options={Tags.filter(tag => tag.classification === "Zoning").map(t => t.name)}
            required={true}
            class="w-full"
            aria-required="true"
          />
        </div>
      </div>

      <div class="flex items-center justify-between gap-4 mt-5">
        <div>
          {#if error}
            <p class="text-sm text-red-600" role="alert">{error}</p>
          {/if}
          {#if success}
            <p class="text-sm text-green-700" role="status">Saved ✓</p>
          {/if}
        </div>

        <div class="ml-auto flex items-center gap-3">
          <button
            type="submit"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow-sm
                   bg-sky-600 text-white hover:bg-sky-700 active:scale-98 focus:outline-none focus-visible:ring-4
                   focus-visible:ring-sky-200 hover:cursor-pointer"
            aria-disabled={submitting}
            disabled={submitting}
          >
            {#if submitting}
              <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" class="opacity-75"></path>
              </svg>
              Saving...
            {:else}
              Submit
            {/if}
          </button>

          <button
            type="button"
            class="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
            onclick={() => { title=''; location=''; description=''; progressTag=''; zoningTag=''; error=''; success=false; }}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

<style>
  /* tiny visual tweak: slightly reduce active button scale */
  .active\:scale-98:active { transform: scale(.98); }
</style>
