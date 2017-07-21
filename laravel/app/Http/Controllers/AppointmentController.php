<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appointments[] = Appointments::all();

        return response()->json($appointments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $appointment = Appointment::findOrFail($id);

        return response()->json($appointment, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
//        return response()->json([$request['appointment'], $request['activeUser'], $id], 200);
        $activeUser = User::findOrFail($request['activeUser']['id']);
        $sessionId = $request['activeUser']['sessionId'];
        if ($sessionId !== $activeUser['sessionId']){
            return response()->json("Error: Credentials did not match", 403);
        }

        $appointment = Appointment::findOrFail($id);

        //TODO: add updated timestamp

        $appointment->name = $request['appointment']['name'];
        $appointment->type = $request['appointment']['type'];
        $appointment->description = $request['appointment']['description'];
        $appointment->country = $request['appointment']['country'];
        $appointment->city = $request['appointment']['city'];
        $appointment->street = $request['appointment']['street'];
        $appointment->streetNumber = $request['appointment']['streetNumber'];
        $appointment->postcode = $request['appointment']['postcode'];
        $appointment->timeStart = $request['appointment']['timeStart'];
        $appointment->timeEnd = $request['appointment']['timeEnd'];
        $appointment->update();

        return response()->json($appointment, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
