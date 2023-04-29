import { RenderApp } from "..";
function InstallPlugins() {
	return <div className="text-red-500 text-5xl">Plugins Store</div>;
}

RenderApp(<InstallPlugins />);

{
	/* <header class="flex">
			<h1 class="text-red-500 text-5xl">Plugins</h1>
			<!-- TODO: leave for later, would need to set up some kind of database -->
			<!-- <select>
				<option value="a-z">Sort Alphabetically A-Z</option>
				<option value="z-a">Sort Alphabetically Z-A</option>
				<option value="most-recent">Most Recent</option>
				<option value="most-downloads">Most Downloads</option>
				<option value="highest-rated">Highest Rated</option>
			</select> -->
			<select>
				<option value="list">List</option>
				<option value="grid">Grid</option>
			</select>
			<input id="search" type="text" placeholder="Search..." />
		</header>
		<!-- TODO: Explain this better (that I could have missed something while reviewing the code or something else) -->
		<div>
			Warning: These plugins have been made by the community and could
			contain bugs or vulnerabilities
		</div>
		<div id="plugins-container" class="flex flex-col bg-red-500">
			<div id="spinner" class="lds-ring">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div> */
}
