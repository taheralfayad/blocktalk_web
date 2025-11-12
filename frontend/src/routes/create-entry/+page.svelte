<script>
  import { PUBLIC_BACKEND_URL } from '$env/static/public';
  import Retvrn from '../../components/retvrn.svelte';
  import Input from '../../components/input.svelte'
  import SelectInput from '../../components/select.svelte';
  import Tags from '../../globals/tags.json';

  let title = $state('');
  let location = $state('');
  let latitude = $state('');
  let longitude = $state('');
  let zoningTag = $state('');
  let progressTag = $state('');
  let description = $state('');

  let handleSubmit = async () => {
    const data = {
      'title': title,
      'location': location,
      'longitude': -81.3792,
      'latitude': 28.5383,
      'tags': [
        {'name': zoningTag, 'classification': "Zoning"},
        {'name': progressTag, 'classification': 'Progress'}
      ],
      'description': description
    }

    try {
      const response = await fetch(`${PUBLIC_BACKEND_URL}/create-entry`, {
        method: 'POST',
        headers: {
          'Authorization': `${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }

  }
</script>

<div class="flex flex-col h-screen">
  <Retvrn/>
  <h1 class="m-2 text-xl">Add an entry and help your neighbor know what's up!</h1>
  <div class="m-2 max-w-56">
    <Input bind:value={title} id="title" label="Add Title"/>
  </div>
  <div class="m-2 max-w-56">
    <Input bind:value={location} id="location" label="Add location"/>
  </div>
  <div class="m-2 max-w-56">
    <Input bind:value={description} id="description" label="Add description"/>
  </div>
  <div class="m-2 max-w-56">
    <SelectInput
      id="progressTagsSelect"
      label="Select Progress Tag"
      bind:value={progressTag}
      options={Tags
        .filter(tag => tag.classification === "Progress")
        .map(tag => tag.name)
      }
      required={true}
    />
  </div>
  <div class="m-2 max-w-56">
    <SelectInput
      id="zoningTagsSelect"
      label="Select Zoning Tag"
      bind:value={zoningTag}
      options={Tags
        .filter(tag => tag.classification === "Zoning")
        .map(tag => tag.name)
      }
      required={true}
    />
  </div>
  <button on:click={handleSubmit} class="border border-black max-w-24 m-2">
    Submit
  </button>
</div>
