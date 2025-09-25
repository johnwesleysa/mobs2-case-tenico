<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Vehicle::all();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'plate' => 'required|unique:vehicles',
            'model' => 'required',
            'manufacturer' => 'required',
            'year' => 'required|digits:4'
        ]);

        $vehicle = Vehicle::create($data);

        return response()->json($vehicle, 201);
    }

    public function show($id){
        return Vehicle::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $vehicle = Vehicle::findOrFail($id);
        $data = $request->validate([
            'plate' => 'required|unique:vehicles,plate'.$vehicle->id,
            'model' => 'required',
            'manufacturer' => 'required',
            'year' => 'required|digits:4'
        ]);

        $vehicle -> update($data);
        return response()->json($vehicle);
    }

    public function destroy($id) {
        $vehicle = Vehicle::findOrFail($id);
        $vehicle->delete();
        return response()->json(null, 204);
    }
}
