<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ModalController extends Controller
{
    public function index()
    {
        return Inertia::render('Modals/Index');
    }
}