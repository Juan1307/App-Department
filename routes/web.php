<?php

use App\Http\Controllers\{HomeController, DepartmentController};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);
Route::get('/dashboard', [HomeController::class, 'dashboard']);

Route::prefix('/organizacion')->group(function () {
    Route::controller(DepartmentController::class)->group(function () {
        Route::get('/',  'index');
        Route::post('/create',  'create');
        Route::put('/update',  'update');
        Route::delete('/delete/{id}',  'delete')->where('id', '[0-9]+');
        Route::post('/delete-multiple',  'deleteMultiple');
    });
});

Route::prefix('/modelos')->group(function () {
    Route::get('/index', function () {
        return Inertia::render('Models/Index');
    });
    Route::get('/crear', function () {
        return Inertia::render('Models/Create');
    });
});

Route::prefix('/seguimientos')->group(function () {
    Route::get('/index', function () {
        return Inertia::render('Follows/Index');
    });
    Route::get('/crear', function () {
        return Inertia::render('Follows/Create');
    });
});

Route::get('/notificaciones', function () {
    return Inertia::render('Notifications');
});

Route::get('/preguntas', function () {
    return Inertia::render('Questions');
});

// === profile ===
Route::get('/perfil', function () {
    return Inertia::render('Profile/Index');
});

Route::post('/logout', function () {
    return Inertia::render('Index');
});
// === profile ===



/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

/* 
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
 */
// require __DIR__.'/auth.php';
