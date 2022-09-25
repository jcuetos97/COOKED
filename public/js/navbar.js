// Trending
if (document.location.href.indexOf('/dashboard/trending')) {
    document.getElementById('trending').classList.add('active');
    document.getElementById('trending-icon').style.display='inherit';
} 
if (!document.location.pathname.includes('/dashboard/trending')) {
    document.getElementById('trending').classList.remove('active');
    document.getElementById('trending-icon').style.display='none';
}

// Veggie
if (document.location.href.indexOf('/dashboard/category/Veggie')) {
    document.getElementById('veggie').classList.add('active');
    document.getElementById('veggie-icon').style.display='inherit';
}
if (!document.location.pathname.includes('/dashboard/category/Veggie')) {
    document.getElementById('veggie').classList.remove('active');
    document.getElementById('veggie-icon').style.display='none';
}

// All-Meats
if (document.location.href.indexOf('/dashboard/category/All-Meats')) {
    document.getElementById('all-meats').classList.add('active');
    document.getElementById('all-meats-icon').style.display='inherit';
}
if (!document.location.pathname.includes('/dashboard/category/All-Meats')) {
    document.getElementById('all-meats').classList.remove('active');
    document.getElementById('all-meats-icon').style.display='none';
}

// Desserts
if (document.location.href.indexOf('/dashboard/category/Dessert')) {
    document.getElementById('desserts').classList.add('active');
    document.getElementById('desserts-icon').style.display='inherit';
}

if (!document.location.pathname.includes('/dashboard/category/Dessert')) {
    document.getElementById('desserts').classList.remove('active');
    document.getElementById('desserts-icon').style.display='none';
}

// My posts 
if (document.location.href.indexOf('/dashboard/myposts')) {
    document.getElementById('myposts').classList.add('active');
    document.getElementById('myposts-icon').style.display='inherit';
}

if (!document.location.pathname.includes('/dashboard/myposts')) {
    document.getElementById('myposts').classList.remove('active')
    document.getElementById('myposts-icon').style.display='none';
}
