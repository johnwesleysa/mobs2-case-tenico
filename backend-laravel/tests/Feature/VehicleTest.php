<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class VehicleTest extends TestCase
{
    use DatabaseMigrations;

    public function test_create_vehicle_requires_auth()
    {
        $response = $this->withHeaders([
            'Accept' => 'application/json'
        ])->postJson('/api/vehicles', [
            'plate' => 'TEST1234',
            'model' => 'ModelX',
            'manufacturer' => 'Maker',
            'year' => 2021
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_vehicle()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $response = $this->postJson('/api/vehicles', [
            'plate' => 'TEST1234',
            'model' => 'ModelX',
            'manufacturer' => 'Maker',
            'year' => 2021
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['plate' => 'TEST1234']);
    }
}
