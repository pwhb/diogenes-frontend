<script>
	import Navbar from "$lib/components/admin/navbar.svelte";

</script>
<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar/>
      <slot/>
   
    
    </div> 
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li><a href="/manage/users">Users</a></li>
        <li><a href="/manage/templates">Templates</a></li>
        <li><a href="/manage/states">Init States</a></li>
      </ul>
    
    </div>
  
</div>

